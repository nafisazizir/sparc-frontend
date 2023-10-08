import { create } from "zustand";

interface ReportModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useReportModal = create<ReportModalStore>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
    document.body.classList.add("hidden");
  },
  onClose: () => {
    set({ isOpen: false });
    document.body.classList.remove("hidden");
  },
}));

export default useReportModal;
