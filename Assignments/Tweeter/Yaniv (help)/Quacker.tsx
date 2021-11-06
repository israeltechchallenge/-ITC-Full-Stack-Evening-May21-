import { useState, useEffect } from 'react';
import './Quacker.scss';
import QuackForm from './components/quackForm';
import Quacks from './components/quacks';
import Modal from 'react-modal';

import swal from 'sweetalert';
import localforage from 'localforage';
import sortByDate from './utilities/sortByDate';

import QuackI from './interfaces/quackI';
import { QuackerQuacksStateI, QuackermodalIsOpenStateI, modalQuackIndexStateI } from './interfaces/quackerStatesI';

Modal.setAppElement('#root');
const customStyles: object = {
  content: {
    inset: 'unset',
    border: 'unset',
    background: 'unset',
    overflow: 'unset',
    borderRadius: 'unset',
    outline: 'unset',
    padding: 'unset',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  }
};

const Quacker:React.FC = (): JSX.Element => {
  const [quacks, setQuacks] = useState<QuackerQuacksStateI>([]);
  const [modalIsOpen, setIsOpen] = useState<QuackermodalIsOpenStateI>(false);
  const [modalQuackIndex, setModalQuackIndex] = useState<modalQuackIndexStateI>(0);

  useEffect(() => {
    const getLocalforageQuacks = async () => {
      const getQuacks: QuackI[] | null = await localforage.getItem('quacks');
      setQuacks(getQuacks ? getQuacks : []);
    }

    getLocalforageQuacks();
  },[]);

  const handleAdd = async (newQuack) => {
    const updatedQuacks = [newQuack, ...quacks];
    setQuacks(updatedQuacks);
    await localforage.setItem('quacks', updatedQuacks);
  }

  const handleUpdate = async (updatedQuack) => {
    let modifiedQuacks = [...quacks];
    if (modifiedQuacks[modalQuackIndex].text !== updatedQuack.text) {
      modifiedQuacks.splice(modalQuackIndex, 1, updatedQuack);
      modifiedQuacks = sortByDate(modifiedQuacks);
      const updatedQuacks: QuackI[] = modifiedQuacks;
      setQuacks(updatedQuacks);
      await localforage.setItem('quacks', updatedQuacks);
    }
    closeModal();
  }

  const handleDelete = async (updatedQuacks) => {
    setQuacks(updatedQuacks);
    await localforage.setItem('quacks', updatedQuacks);
  }

  const confirmDelete = (deleteIndex: number) => {
    swal({
      title: "Delete Quack?",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    })
    .then((willDelete: boolean) => {
      if (willDelete) {
        let updatedQuacks = [...quacks];
        updatedQuacks.splice(deleteIndex, 1);

        updatedQuacks = sortByDate(updatedQuacks);
        
        handleDelete(updatedQuacks);
      } else swal(`Deletion cancelled`);
    });
  }

  const openModal = (targetElement, updateIndex) => {
    if (targetElement.classList.contains('fa-trash')) return;
    setModalQuackIndex(updateIndex);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="Quacker">
      <header className="Quacker-header">
        <h1 className="Quacker-h1">Quacker with React.js</h1>
        <QuackForm onAdd={handleAdd} onUpdate={null} existingQuack={null} />
      </header>
      <main className="Quacker-main">
        <Quacks quacks={quacks} {...{ confirmDelete, openModal }} />
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
          <span className="modal__item modal__item--close" onClick={closeModal}>✖</span>
          <QuackForm onUpdate={handleUpdate} existingQuack={modalIsOpen ? quacks[modalQuackIndex] : null} onAdd={null} />
        </Modal>

      </main>
      <footer className="Quacker-footer">
        <p>© all rights reserved to <a className="Quacker-link" href="https://www.linkedin.com/in/yaniv-aflalo-8aa92386/" target="_blank" rel="noreferrer">Yaniv Aflalo</a>, full stack developer</p>
      </footer>
    </div>
  );
}

export default Quacker;