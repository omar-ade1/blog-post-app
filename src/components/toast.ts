import Swal from "sweetalert2";

// Alert
export const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  showCloseButton: true,
  customClass: {
    popup: "dark:!bg-gray-700",
    timerProgressBar: "dark:!bg-white",
title : "dark:!text-white"
  },
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});
