import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

function DeleteManyItemsModal({
  showModal,
  closeModal,
  objectType,
  items,
  deleteComfirmedItems,
}) {
  return (
    <CModal
      show={showModal}
      onClose={() => closeModal()}
      color="danger"
      centered
    >
      <CModalHeader closeButton>
        <CModalTitle>Eliminar {objectType}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p className="text-center">
          Seguro que desea eliminar a los <strong>{objectType}</strong>
        </p>
      </CModalBody>
      <CModalFooter>
        <CButton
          color="danger"
          onClick={() => {
            closeModal();
            deleteComfirmedItems(items);
          }}
        >
          Sí, estoy seguro
        </CButton>{" "}
        <CButton color="secondary" onClick={() => closeModal()}>
          Cancelar
        </CButton>
      </CModalFooter>
    </CModal>
  );
}

export default DeleteManyItemsModal;
