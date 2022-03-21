import React from 'react'
import ReactDOM  from 'react-dom'

const Modal = ({children,isOpen}) => {
  return  ReactDOM.createPortal(<div className="overlay" onClick={()=> isOpen(false)}>
                            <div className="modal" onClick={(event) => {event.stopPropagation()}}>
                            <div className="btn btn-light" style={{"display":"flex", "width":"100%", "justifyContent":"flex-end"}}>
                                <i className="fas fa-times" style={{"padding":"10px"}}  onClick={()=>isOpen(false)}></i>
                            </div>
                                {children}
                            </div>
                        </div>, document.getElementById('portal')
  )
}

export default Modal