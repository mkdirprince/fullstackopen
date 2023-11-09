import React from "react";
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog";


const blog = {
  title: "Testing Frontend",
  author: "Prince Wilson",
  url: "www.mkdirprince.com",
  likes: 200,
  id: "asdwe3212313dsa2123"
}


describe('<Blog/>', () => {


  test("renders the blog's title and author", () => {


    const container = render(<Blog blog={blog}/>).container

   const titleAuhorTag = container.querySelector('.title-author')
   
   
   expect(titleAuhorTag).toBeDefined()

  })

  test('does not render its URL or number of likes by default', () => {

    const container = render(<Blog blog={blog}/>).container


    const urlTag = container.querySelector('.url')

    const likesTag = container.querySelector('.likes')

    expect(urlTag).toBeNull()
    expect(likesTag).toBeNull()
  })


  test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {


    const container = render(<Blog blog={blog}/>).container


    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    
    const urlTag = container.querySelector('.url')
    const likesTag = container.querySelector('.likes')

    expect(urlTag).toBeDefined()
    expect(likesTag).toBeInTheDocument()

  })

  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {

   
    const updateLikes = jest.fn()
    const user = userEvent.setup()
 

    render(<Blog blog={blog} updateLikes={updateLikes}/>).container

    
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('likes')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateLikes.mock.calls).toHaveLength(2)
    
  })

})

