import ToastService from 'react-material-toast';

const toast = ToastService.new({
    place: 'topRight',
    duration: 1,
    maxCount: 2
});

const Toast = {
    apiFailureToast,
    apiSuccessToast,
};
export default Toast;

function apiFailureToast(message) {
    toast.error(message ? message : "apiConstant.API_FAILURE");
}

function apiSuccessToast(msg) {
    toast.success(msg ? msg : "apiConstant.API_SUCCESS");
}