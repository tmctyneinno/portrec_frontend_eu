import Swal from 'sweetalert2'
//@ts-ignore
import validator from 'validator';

export default {
    isEmail: (email: string) => {
        return validator.isEmail(email)
    },

    isExtension: (fileName: string, requiredFormats: string[]) => {
        const regex = new RegExp('[^.]+$');
        const ext: any = fileName.match(regex);
        // get the extension
        const fileExtension = ext[0].toLowerCase()
        //make sure the file is a valid  format
        if (!(requiredFormats.some(x => x == fileExtension.toLowerCase()))) return false
        else return true
    },

    truncateStr(str: string, num: number) {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    },

    toast: (text: string, icon: any) => {
        // @ts-expect-error
        Swal.fire({
            toast: true,
            icon: `${icon}`,
            text: `${text}`,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false,
            padding: 10,
            // iconColor: '#2c3e50',
        })
    },

    toastShort: (text: string) => {
        Swal.fire({
            toast: true,
            text: `${text}`,
            position: 'top-right',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            padding: 10,
        })
    },

    confirm: (text: string, btnText: string) => {
        return Swal.fire({
            // title: `${title}`,
            text: `${text}`,
            // icon: 'question',
            iconColor: '#2c3e50',
            showCancelButton: true,
            confirmButtonText: `${btnText}`,
            cancelButtonText: 'cancel',
            confirmButtonColor: '#00B383',
            reverseButtons: true,
            width: '300px',
        })
    },

    addCommas: (numb: number) => {
        const str = !numb ? ['0'] : numb.toString().split(".");
        str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return str.join(".");
    }
}