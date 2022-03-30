export function convertToFormData<T>(formValue: T): FormData {
    const formData = new FormData();
    Object.entries(formValue).forEach(([key, value]) => {
        if (!!value) {
            formData.append(key, value);
        }
    })
    return formData;
}