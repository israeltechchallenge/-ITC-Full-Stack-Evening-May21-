import reactDOM from "react-dom";
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import Counter from "../counter";

describe('Check component is Mounting and Unmounting', () => {
    const mockProps = {
        onIncrement: () => {},
        onDecrement: () => {},
        onDelete: () => {},
        counter:{ id: 1, value: 0 }
    }
    test('Test the component is mounting and unmounting', () => {
        const container = document.createElement('div')
        reactDOM.render(<Counter {...mockProps}/>, container)
        const unmounted = reactDOM.unmountComponentAtNode(container)
        expect(unmounted).toEqual(true)
    }) 
})

describe('Check initial status',() => {
    let mockProps 
    beforeEach(() => {
        mockProps = {
            onIncrement: jest.fn(),
            onDecrement: jest.fn(),
            onDelete: jest.fn(),
            counter:{ id: 1, value: 0 }
        }
    })
    test('Check counter set to zero', () => {
        const { getByRole, getByText } = render(<Counter {...mockProps}/> )
        const counterContainer = getByRole('counter-number')
        expect(counterContainer).toHaveTextContent('Zero')
    })
    test('Test increment button',() => {
        const { getByRole, rerender } = render(<Counter {...mockProps}/> )
        const incrementButton = getByRole('increment-button')
        userEvent.click(incrementButton)
        expect(mockProps.onIncrement).toHaveBeenCalledTimes(1)
        mockProps.counter.value++
        rerender(<Counter {...mockProps}/>)
        const counterContainer = getByRole('counter-number')
        expect(counterContainer).toHaveTextContent('1')
        expect(counterContainer).toHaveClass('badge-primary')
        const decrementButton = getByRole('decrement-button')
        expect(decrementButton).toBeEnabled()
    })
    test('Test Delete Button',() => {
        const { getByRole } = render(<Counter {...mockProps}/> )
        const deleteButton = getByRole('delete-button')
        userEvent.click(deleteButton)
        expect(mockProps.onDelete).toHaveBeenCalled()
    })

})