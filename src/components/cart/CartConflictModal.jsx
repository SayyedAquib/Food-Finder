const CartConflictModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="w-[520px] h-[204px] flex flex-col gap-2 left-[33%] p-8 border z-50 shadow-md fixed bottom-10 bg-white">
      <h1 className="font-bold text-lg">Items already in cart</h1>
      <p>
        Your cart contains items from another restaurant. Would you like to
        reset your cart for adding items from this restaurant?
      </p>
      <div className="flex justify-between gap-3 w-full uppercase mt-4">
        <button
          onClick={onCancel}
          className="border-2 w-1/2 p-3 border-green-600 text-green-600"
        >
          No
        </button>
        <button
          onClick={onConfirm}
          className="w-1/2 p-3 bg-green-600 text-white"
        >
          Yes, start Afresh
        </button>
      </div>
    </div>
  );
};

export default CartConflictModal;
