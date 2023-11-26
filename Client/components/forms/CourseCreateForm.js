import { Select, Button } from "antd";


const { Option } = Select;

const CourseCreateForm = ({ handleSubmit, handleChange, handleImage, setValues, values }) => {

    const children = [];
    for (let i = 9.99; i <= 100.99; i++) {
        children.push(<Option key={i.toFixed}>${i.toFixed(2)}</Option>)
    }



    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-3 pb-3">
                <input type="text" name="name" className="form-control" placeholder="Course Name" value={values.name} onChange={handleChange} />
                <textarea name="description" cols="7" rows="7" className="form-control" placeholder="Course Description" value={values.description} onChange={handleChange}></textarea>
            </div>



            <div className="form-row pt-3">
                <div className="col">
                    <div className="form-group">
                        <Select value={values.paid} style={{ width: "100%" }} size="large" onChange={v => setValues({ ...values, paid: !values.paid })}>
                            <Option value={true}>Paid</Option>
                            <Option value={false}>Free</Option>
                        </Select>
                    </div>
                </div>

                {values.paid && (
                    <div className="form-group">
                        <Select
                            defaultValue="$9.99"
                            // style={{width:"100%"}}
                            onChange={(v) => setValues({ ...values, price: v })}
                            tokenSeperators={[,]}
                            size="large"
                        >
                            {children}
                        </Select>
                    </div>
                )}
            </div>



            <div className="form-group pt-3 pb-3">
                <input type="text" name="category" className="form-control" placeholder="Category" value={values.category} onChange={handleChange} />
            </div>




            <div className="form-row pt-3">
                <div className="col">
                    <div className="form-group">
                        <label className="btn btn-outline-secondary btn-block text-left">
                            {values.loading ? "Uploading" : "Image Upload"}
                            <input type="file" name="image" onChange={handleChange} accept="image/*" hidden />
                        </label>
                    </div>
                </div>
            </div>

            <div className="row pt-3">
                <div className="col">
                    <Button loading={values.loading} type="primary" size="large" shape="round" onClick={handleSubmit} disabled={values.loading || values.uploading} className="btn btn-primary">
                        {values.loading ? "Saving..." : "Save & Continue"}
                    </Button>
                </div>
            </div>
        </form>
    )

}

export default CourseCreateForm;