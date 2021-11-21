import reactDOM from "react-dom";
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import Counters from "../counters";
jest.mock('../counter', () => () => <div>Mocked Component</div>)
describe('Check component is Mounting and Unmounting', () => {
    const mockProps = {
        onIncrement: jest.fn(),
        onDecrement: jest.fn(),
        onDelete: jest.fn(),
        onReset: jest.fn(),
        onRestart: jest.fn(),
        counters:[
            { id: 1, value: 0 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 },
          ]
    }
    test('Test the component is mounting and unmounting', () => {
        const container = document.createElement('div')
        reactDOM.render(<Counters {...mockProps}/>, container)
        const unmounted = reactDOM.unmountComponentAtNode(container)
        expect(unmounted).toEqual(true)
    }) 
})

describe('Check Functinatioly of Counters', () =>{
    const mockProps = {
        onIncrement: jest.fn(),
        onDecrement: jest.fn(),
        onDelete: jest.fn(),
        onReset: jest.fn(),
        onRestart: jest.fn(),
        counters:[
            { id: 1, value: 0 },
            { id: 2, value: 0 },
            { id: 3, value: 0 },
            { id: 4, value: 0 },
          ]
    }

    test('Check the right number of counters are rendered', () => {
        const { getAllByText } = render(<Counters {...mockProps}/> )
        const countersOnScreen = getAllByText('Mocked Component')
        expect(countersOnScreen).toHaveLength(4)
    })
})