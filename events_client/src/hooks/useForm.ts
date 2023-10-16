import { useState } from "react";

type FormHookOptions<T> = T;

const useForm = <T>(initialValues: FormHookOptions<T> = {} as T) => {
	const [values, setValues] = useState<T>(initialValues);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setValues((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked: value } = e.target;

		setValues((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = e.target;

		setValues((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	return {
		values,
		handleInputChange,
		handleCheckboxChange,
		handleSelectChange,
	};
};

export default useForm;
