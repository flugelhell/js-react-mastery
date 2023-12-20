const Modal = ({ modal_name, title, content }) => {
  return (
    <dialog id={modal_name} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{content}</p>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
