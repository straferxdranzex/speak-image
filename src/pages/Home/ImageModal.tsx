import { IoMdClose } from "react-icons/io";

interface ImageModalProps {
  imageUrl: string | null;
  onClose?: () => void;
}

// Modal Component
const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <section
      aria-label="image Model"
      className="fixed inset-0 flex items-center justify-center z-[10000] bg-black/80"
      onClick={onClose}
    >
      <div className="text-white relative max-w-[95%] sm:max-w-3xl w-full mx-auto flex items-center min-h-16">
        <img
          src={imageUrl || ""}
          alt="Full-sized visual"
          className="w-full h-auto max-h-full object-cover rounded-lg"
        />
        <button
          className="absolute top-4 right-4 size-8 text-xl grid place-content-center text-white bg-neutral-900 rounded-full"
          onClick={onClose}
        >
          <IoMdClose />
        </button>
      </div>
    </section>
  );
};

export default ImageModal;
