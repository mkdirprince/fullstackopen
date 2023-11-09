import React from "react";
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from "./BlogForm"


describe('<BlogForm/>', () => {


  test('', async () => {

    const createBlog = jest.fn()
    const user = userEvent.setup()


    render(<BlogForm createBlog={createBlog}/>)

    const titleInput = screen.getByPlaceholderText("Enter blog's title")

    const authorInput = screen.getByPlaceholderText("Enter blog's author")

    const linkInput = screen.getByPlaceholderText("Enter url")

    const createButton = screen.getByText('create')

    await user.type(titleInput, 'A title blog')
    await user.type(authorInput, 'Sam Smith')
    await user.type(linkInput, 'https://moodle.learna.ac.uk/mod/forum/discuss.php?d=183292')



    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('A title blog')
    expect(createBlog.mock.calls[0][0].author).toBe('Sam Smith')
    expect(createBlog.mock.calls[0][0].url).toBe('https://moodle.learna.ac.uk/mod/forum/discuss.php?d=183292')

  })

})