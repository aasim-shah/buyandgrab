import { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { MdDeleteSweep } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import PulseLoader from "react-spinners/PulseLoader";

export default function _AddProduct() {
  const [files, setFiles] = useState([]);
  const [gall, setGall] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [headingText, setHeadingText] = useState("details");
  const [allHeadings, setallHeadings] = useState(["details"]);
  const [img, setImg] = useState([]);
  const [gallUploaded, setGallUploaded] = useState(false);
  const [upperFields, setUpperFields] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    subCategory: "",
  });

  const [fields, setFields] = useState([]);

  const [clrFields, setClrFields] = useState([]);
  const [sizeFields, setSizeFields] = useState([]);

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
    e.preventDefault();
 try {
  setGallUploaded(true);
  files.forEach(async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "okaybosshhh");
    data.append("cloud_name", "dy9crvf1i");
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dy9crvf1i/image/upload",
      data
    );
    setGall((prev) => [...prev, { url: res.data.url }]);
  });

 } catch (error) {
  
 }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      console.log(img);
      let imgUrls = [];
      const data = new FormData();
      for (let i = 0; i < 2; i++) {
        data.append("file", img[i]);
        data.append("upload_preset", "okaybosshhh");
        data.append("cloud_name", "dy9crvf1i");
        const urls = await axios.post(
          "https://api.cloudinary.com/v1_1/dy9crvf1i/image/upload",
          data
        );
        imgUrls.push(urls.data.url);
      }
      if (files.length === gall.length) {
        const allData = {
          name: upperFields.name,
          description: upperFields.description,
          price: upperFields.price,
          category: upperFields.category,
          subCategory: upperFields.subCategory,
          image: imgUrls[0],
          hoverImage: imgUrls[1],
          gallary: gall,
          specifications: fields,
          colours: clrFields,
          sizes: sizeFields,
        };
        // const third = await    axios.post("https://ennmart.herokuapp.com/api/v1/add_new", allData)
        const third = await axios.post(`https://ennmart.herokuapp.com/api/v1/add_new` ,allData )
        console.log(third.data, "third data");
        if (third) {
          console.log("reload page");
          window.location = "/admin";
        }
      } else {
        console.log("click upload gall button to upload selected files first");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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

  //clrfield functions
  const onChangeClrField = async (e, ind) => {
    const tem = clrFields;

    tem[ind][e.target.name] = e.target.value;
    setClrFields([...tem]);
  };

  const addClrField = () => {
    setClrFields([
      ...clrFields,
      {
        id: uuidv4(),
        value: "",
      },
    ]);
  };

  const delClrField = (x) => {
    const temp = clrFields.filter((obj) => obj.id !== x);
    setClrFields(temp);
  };

  //sizeFields functions
  const onChangeSizeField = async (e, ind) => {
    const temp = sizeFields;
    temp[ind][e.target.name] = e.target.value;
    setSizeFields([...temp]);
  };
  const addSizeField = (e) => {
    setSizeFields([
      ...sizeFields,
      {
        id: uuidv4(),
        value: "",
      },
    ]);
  };

  const delSizeField = (x) => {
    const delArray = sizeFields.filter((obj) => obj.id !== x);
    setSizeFields(delArray);
  };
  return (
    <>
      <div className="form-main-container my-5 w-11/12 mx-auto md:w-[76%] mr-5 ml-auto ">
        <p className="text-xs font-bold ml-3 my-1">*Add New Product</p>
        <form>
          <div className="bg-gray-200 py-2 rounded-md mb-2">
            <input
              type="text"
              name="name"
              onChange={(e) => {
                handleUpperFields(e);
              }}
              value={upperFields.name || ""}
              placeholder="Product name .."
              className="w-9/12 border-2 border-gray-300 py-1 px-3  block mx-auto"
            />

            <input
              type="text"
              name="description"
              onChange={(e) => {
                handleUpperFields(e);
              }}
              value={upperFields.description || ""}
              placeholder="Product Description .."
              className="w-9/12 border-2 border-gray-300 py-1 px-3 block mx-auto"
            />

            <input
              type="number"
              name="price"
              onChange={(e) => {
                handleUpperFields(e);
              }}
              value={upperFields.price || ""}
              placeholder="Product Price .."
              className="w-9/12 border-2 border-gray-300 py-1 px-3 block mx-auto"
            />

            <input
              type="text"
              name="category"
              onChange={(e) => {
                handleUpperFields(e);
              }}
              value={upperFields.category || ""}
              placeholder="Product category .."
              className="w-9/12 border-2 border-gray-300 py-1 px-3 block mx-auto"
            />

            <input
              type="text"
              name="subCategory"
              onChange={(e) => {
                handleUpperFields(e);
              }}
              value={upperFields.subCategory || ""}
              placeholder="Product subCategory .."
              className="w-9/12 border-2 border-gray-300 py-1 px-3 block mx-auto"
            />
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

          <div className="bg-gray-200 py-3 rounded-md mt-2">
            <p className="text-gray-900 ml-3">Colours : </p>
            {clrFields.map((clrfield, ind) => (
              <div className="flex flex-row mx-3 mt-2 " key={clrfield.id}>
                <input
                  type="text"
                  placeholder="Add colour"
                  name="value"
                  className="w-9/12 block  mx-auto py-1 px-3   "
                  id=""
                  onChange={(e) => {
                    onChangeClrField(e, ind);
                  }}
                />
                <button
                  type="button"
                  className=" bg-white rounded-md py-1 px-2 mr-2"
                  onClick={(e) => delClrField(clrfield.id)}
                >
                  <MdDeleteSweep color="red" size={23} />
                </button>
              </div>
            ))}
            <button
              className="bg-[#ffff] mt-4 ml-8 rounded-md text-sm px-5 font-bold  py-1 "
              type="button"
              onClick={(e) => {
                addClrField(e);
              }}
            >
              {" "}
              + Colour
            </button>
          </div>

          <div className="bg-gray-200 py-3 mt-2 rounded-md">
            <p className="text-gray-900 ml-3">Sizez : </p>
            {sizeFields.map((sizefield, ind) => (
              <div className="flex flex-row  mt-2 " key={sizefield.id}>
                <input
                  type="text"
                  placeholder="Add size"
                  className="w-9/12 block mx-auto py-1 px-3  "
                  name="value"
                  id=""
                  onChange={(e) => {
                    onChangeSizeField(e, ind);
                  }}
                />
                <button
                  type="button"
                  className=" bg-white rounded-md py-1 px-2 mr-2"
                  onClick={(e) => delSizeField(sizefield.id)}
                >
                  <MdDeleteSweep color="red" size={23} />
                </button>
              </div>
            ))}
            <button
              className="bg-[#ffff] mt-4 ml-8 rounded-md text-sm px-5 font-bold  py-1 "
              type="button"
              onClick={(e) => {
                addSizeField(e);
              }}
            >
              {" "}
              + Size
            </button>
          </div>

          <div className="input-div w-full flex flex-row items-center  justify-evenly mt-3 bg-gray-200 py-3">
            <p className="hidden md:block">Select Thumbnail : </p>
            <input
              type="file"
              name="file"
              id=""
              className="w-8/12"
              onChange={(e) => {
                setImg([...img, e.target.files[0]]);
              }}
            />
          </div>

          <div className="input-div w-full flex flex-row items-center mb-3  justify-evenly mt-3 bg-gray-200 py-3">
            <p className="hidden md:block">Select Hover Image : </p>
            <input
              type="file"
              name="file"
              id=""
              className="w-8/12"
              onChange={(e) => {
                setImg([...img, e.target.files[0]]);
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
                <p className="text-center">
                  Drag 'n' drop some files here, or click to select files
                </p>
              )}
            </div>
            {files.length > 0 ? (
              <button
                disabled={gallUploaded}
                className="absolute top-[35%] left-[35%] bg-gray-500 rounded-md w-32 mx-auto py-2  text-white font-bold"
                onClick={handleGallary}
              >
               Upload
              </button>
            ) : (
              ""
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gray-300  font-bold rounded-md py-2 mt-2 px-3"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <PulseLoader
                color={"black"}
                loading={isLoading}
                size={10}
                className={"pt-1"}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
