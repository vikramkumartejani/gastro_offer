export default function CancelPopup({ handleClosePopup, selectedOrder, setShowCancelPopup }) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Cancel?</h3>
          <p>Are you sure to cancel your order?</p>
          <div className="flex gap-4 mt-4">
            <button onClick={handleClosePopup} className="px-4 py-2 bg-gray-400 text-white rounded-md">
              NO
            </button>
            <button onClick={() => {
              // Handle cancel action here
              setShowCancelPopup(false);
            }} className="px-4 py-2 bg-yellow-600 text-white rounded-md">
              YES
            </button>
          </div>
        </div>
      </div>
    );
  }
  