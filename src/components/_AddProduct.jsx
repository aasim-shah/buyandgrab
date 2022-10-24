import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteSweep } from "react-icons/md";
import { useDropzone } from "react-dropzone";

export default function _AddProduct() {
  const [files, setFiles] = useState([]);
  const [gall, setGall] = useState([]);
  const [headingText, setHeadingText] = useState("general");
  const [allHeadings, setallHeadings] = useState(["general"]);
  const [img, setImg] = useState("");
  const [upperFields, setUpperFields] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const [fields, setFields] = useState([
    {
      id: "",
      heading: "general",
      headings: allHeadings,
      name: "",
      value: "",
    },
  ]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleUpperFields = (e) => {
    setUpperFields({ ...upperFields, [e.target.name]: e.target.value });
  };


  const handleGallary = async (e) => {
    e.preventDefault()
        files.forEach( async(file) =>{
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "okaybosshhh");
          data.append("cloud_name", "dy9crvf1i");
     const res =  await  axios.post(
            "https://api.cloudinary.com/v1_1/dy9crvf1i/image/upload",
            data
          )
          setGall(prev => [...prev , {url : res.data.url}])
        })

  }


  const handleSubmit = async (e) => {
    e.preventDefault();
try {
  console.log(gall)


  const data = new FormData();
  data.append("file", img);
  data.append("upload_preset", "okaybosshhh");
  data.append("cloud_name", "dy9crvf1i");
  const first = await axios.post("https://api.cloudinary.com/v1_1/dy9crvf1i/image/upload", data)
    
        if(files.length === gall.length) {
          const allData = {
            name: upperFields.name,
            description: upperFields.description,
            price: upperFields.price,
            image: first.data.url,
            gallary: gall,
            specifications: fields,
          };
        const third = await    axios.post("http://localhost:3001/api/v1/add_new", allData)
        console.log(third.data , 'third data')
        if(third){
          console.log('reload page')
          window.location="/admin"
        }
    
        }else{
          console.log('click upload gall button to upload selected files first')
        }

} catch (error) {
  console.log(error)
}
      
};
  const addField = () => {
    const heading = allHeadings[allHeadings.length - 1];
    setFields([
      ...fields,
      {
        id: uuidv4(),
        heading: heading,
        headings: allHeadings,
        name: "",
        value: "",
      },
    ]);
  };
  const delField = (item) => {
    var ds = fields.filter((obj) => obj.id !== item.id);
    setFields(ds);
    console.log(fields);
  };

  const FieldChanged = (e, index) => {
    const tempData = fields;
    fields[index][e.target.name] = e.target.value;
    setFields([...tempData]);
  };

  const handleAddHeading = () => {
    setallHeadings([...allHeadings, headingText]);
    console.log(allHeadings);
  };

  return (
    <>
      <div className="form-main-container my-5 w-11/12 mx-auto md:w-[76%] mr-5 ml-auto ">
        <p className="text-xs font-bold ml-3 my-1">*Add New Product</p>
        <form >
          <div className="bg-gray-200 py-2 rounded-md mb-2">
            <div className="input-div w-full flex flex-row items-center justify-center mt-3">
              <p className="font-bold  mr-4  hidden md:block">
                Product Name :{" "}
              </p>
              <input
                type="text"
                name="name"
                onChange={(e) => {
                  handleUpperFields(e);
                }}
                value={upperFields.name || ""}
                placeholder="Product name .."
                className="w-9/12 border-2 border-gray-300 py-1 px-3"
              />
            </div>

            <div className="input-div w-full flex flex-row items-center justify-center mt-3 mb-1">
              <p className="font-bold  mr-4 hidden md:block">Product Description : </p>
              <input
                type="text"
                name="description"
                onChange={(e) => {
                  handleUpperFields(e);
                }}
                value={upperFields.description || ""}
                placeholder="Product Description .."
                className="w-9/12 border-2 border-gray-300 py-1 px-3"
              />
            </div>

            <div className="input-div w-full flex flex-row items-center justify-center mt-3 mb-1">
              <p className="font-bold  mr-4 hidden md:block">
                Product Price :{" "}
              </p>
              <input
                type="number"
                name="price"
                onChange={(e) => {
                  handleUpperFields(e);
                }}
                value={upperFields.price || ""}
                placeholder="Product Description .."
                className="w-9/12 border-2 border-gray-300 py-1 px-3"
              />
            </div>
          </div>

          <div className="dynamicFieldsContainer rounded-md bg-gray-200  py-3">
            {fields.map((item, index) => (
              <div key={index}>
                <p className="font-bold text-sm mx-3 mt-2">
                  {item.headings.length > 0
                    ? item.headings[item.headings.length - 1] + " : "
                    : ""}
                </p>
                <div className=" flex flex-row gap-3 mt-2">
                  <input
                    type="text"
                    name="name"
                    className="w-5/12  mx-auto py-1 px-3   "
                    placeholder="FieldName"
                    id=""
                    value={item.name || ""}
                    onChange={(e) => FieldChanged(e, index)}
                  />
                  <input
                    type="text"
                    name="value"
                    className="w-5/12 mx-auto px-3 py-1 "
                    placeholder="FieldValue ...."
                    id=""
                    value={item.value || ""}
                    onChange={(e) => FieldChanged(e, index)}
                  />
                  <button
                    type="button"
                    className=" bg-white rounded-md py-1 px-2 mr-2"
                    onClick={(e) => delField(item)}
                  >
                    <MdDeleteSweep color="red" size={23} />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between mx-8 mt-4  flex-row">
              <div className="okay mr-2">
                <input
                  type="text"
                  name="heading"
                  id=""
                  className="py-1 px-2 text-center mr-1"
                  value={headingText || ""}
                  onChange={(e) => {
                    setHeadingText(e.target.value);
                  }}
                  placeholder="Add Heading"
                />
                <button
                  type="button"
                  onClick={handleAddHeading}
                  className="font-bold  py-1 px-2 bg-white w-full rounded-md mt-1 md:w-auto mr-1"
                >
                  {" "}
                  Add Heading
                </button>
              </div>
              <button
                className="bg-[#ffff] rounded-md text-sm px-5 font-bold  py-1 "
                type="button"
                onClick={addField}
              >
                Add Field
              </button>
            </div>
          </div>
          <div className="input-div w-full flex flex-row items-center  justify-evenly mt-3 bg-gray-200 py-3">
            <p className="hidden md:block">Select Thumbnail : </p>
            <input
              type="file"
              name="file"
              id=""
              className="w-8/12"
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
            />
          </div>
              <div className="border-2 relative border-4 border-red-200 py-3">
                
          <div
            {...getRootProps({
              className:
              "dropzone  flex flex-row pt-5 pb-1 overflow-x-scroll  bg-gray-100 my-1 border-2 dotted font-bold",
            })}
            >
            <input {...getInputProps()} />
            {files.length > 0 ? (
              files.map((image) => (
               <div key={image.preview} className="flex flex-row">
                 <img
                  src={image.preview}
                  alt=""
                  className="w-24 h-24 ml-3"
                  onLoad={() => {
                    URL.revokeObjectURL(image.preview);
                  }}
                  />
               </div>
                  ))
                  ) : (
                    <p className="text-center" >
                Drag 'n' drop some files here, or click to select files
              </p>
            )}
          </div>
          {files.length > 0 ? (<button  className="absolute top-[35%] left-[35%] bg-gray-500 rounded-md w-32 mx-auto py-2  text-white font-bold"  onClick={handleGallary}> UPLOAD</button>) : ""}
            </div>

          <button
            type="submit"
            className="w-full bg-gray-300  font-bold rounded-md py-2 mt-2 px-3"
            onClick={handleSubmit}
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
}
