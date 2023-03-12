import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import { useDispatch, useSelector } from "react-redux";
import { updateMedicineAction, getMedicineByIdAction } from "../actions/MedicineActions";

const UpdateMedicine = () => {
    const params = useParams();
    const dispatch = useDispatch();

    // validating user
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);
    const allMedicines = useSelector((state) => state.fakemedicines.medicines);

    const filteredMedicine = allMedicines.filter(m => { return (m.productId === parseInt(params.productId)) });
    const medicineToUpdate = filteredMedicine[0];

    // initialize the state
    const [medicine, setMedicine] = useState({
        productId: params.productId,
        productName: "",
        productCost: "",
        mfd: "",
        expiryDate: "",
        companyName: "",
        category: {
            categoryId: "",
            categoryName: ""
        }
    });

    const [errors, setErrors] = useState({});

    const schema = {
        productId: Joi.number().min(1).required(),
        productName: Joi.string().max(128).required(),
        productCost: Joi.number().min(1).required(),
        mfd: Joi.date().required(),
        expiryDate: Joi.date().required(),
        companyName: Joi.string().required(),
        category: Joi.object({
            categoryId: Joi.number().min(1).required(),
            categoryName: Joi.string().optional()
        })
    }

    const validate = () => {
        const result = Joi.validate(medicine, schema, {
            abortEarly: false,
        });
        console.log(result);
        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };

    useEffect(() => {
        if(user.userId !== 0 && user.userType !== "ADMIN"){
            return navigate('/unauth');
        } else if (user.userId === 0){
            return navigate('/login');
        }

        dispatch(getMedicineByIdAction(params.productId));
        setMedicine(medicineToUpdate);
    }, []);

    const updateChange = (event) => {
        setMedicine({
            ...medicine,
            [event.target.name]: event.target.value
        });
    };

    const updateCategory = (event) => {
        setMedicine({
            ...medicine,
            category: {
                ...medicine.category,
                [event.target.name]: event.target.value
            }
        });
    }

    const updateMedicine = (event) => {
        event.preventDefault();
        
        const errors = validate();
        // update state with errors after validation
        setErrors({ errors: errors || {} });
        console.log(errors);
        if (errors) return;

        dispatch(updateMedicineAction(medicine));
        window.location.reload(false);
        alert("Medicine updated successfully!");
        window.location.href = '/medicines';
    };

    return (
        <div
            style={{ marginLeft: "auto", marginRight: "auto" }}
            className="col-lg-4 col-10 col-sm-8 col-md-8 border p-4 mt-5 shadow"
            >
                <h3 style={{ fontFamily: 'cursive' }}>Update Product</h3>
                <form onSubmit={ updateMedicine }>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label float-start">
                        Product Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="productName"
                            defaultValue={medicine.productName}
                            name="productName"
                            onChange={ updateChange }
                        />
                        { errors && <small className="text-danger">{errors.productName}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productCost" className="form-label float-start">
                        Product Cost
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="productCost"
                            defaultValue={medicine.productCost}
                            name="productCost"
                            onChange={updateChange}
                        />
                        { errors && <small className="text-danger">{errors.productCost}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="mfd" className="form-label float-start">
                            Manufacture Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="mfd"
                            defaultValue={medicine.mfd}
                            name="mfd"
                            onChange={updateChange}
                        />
                        {errors && <small className="text-danger">{errors.mfd}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiryDate" className="form-label float-start">
                            Expiry Date
                        </label>
                        <input
                            type="date"
                            className="form-control"
                            id="expiryDate"
                            defaultValue={medicine.expiryDate}
                            name="expiryDate"
                            onChange={updateChange}
                        />
                        {errors && <small className="text-danger">{errors.expiryDate}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="companyName" className="form-label float-start">
                            Company Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="companyName"
                            defaultValue={medicine.companyName}
                            name="companyName"
                            onChange={updateChange}
                        />
                        {errors && <small className="text-danger">{errors.companyName}</small>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryId" className="form-label float-start">
                            Category Id
                        </label>
                        <input
                            className="form-control"
                            list="categoryList"
                            id="categoryId"
                            defaultValue={medicine.category ? medicine.category.categoryId : null}
                            name="categoryId"
                            onChange={updateCategory}
                        />
                        {errors && (<small className="text-danger">{errors.category}</small>) }
                        <datalist id="categoryList">
                            <option value="1">Food</option>
                            <option value="2">Toys</option>
                            <option value="3">Accessories</option>
                        </datalist>
                    </div>
                    <div className="d-grid gap-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <Link to='/medicines' type="button" className="btn btn-outline-dark">
                            <i className="bi bi-arrow-return-left"></i> Go Back
                        </Link>
                    </div>
                </form>
            </div>
    );
};

export default UpdateMedicine;