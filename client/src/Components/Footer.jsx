import React from 'react'

const Footer = () => {
  const testArr = [1, 2, 3, 4, 5, 6];
  const test = testArr.map((num, i) => {
    return (
      <div key={i}>
        <p>{num}</p>
      </div>
    )
  })

    return(
      <>
        {test}
        <div className='footer'>
            <div id="edamam-badge"></div>
        </div>
      </>
    )

}

export default Footer