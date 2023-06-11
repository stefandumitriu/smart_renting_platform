import React, { useEffect, useMemo, useState } from "react";
import { Grid, Paper, useTheme } from "@mui/material";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormikContext } from "formik";

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: "fit-content",
  padding: 4,
  boxSizing: "border-box",
  flexDirection: "column",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const deleteButton = {
  backgroundColor: "red",
  minHeight: 20,
  width: "100%",
  color: "white",
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
};

const AddressProofStepComponent: React.FC = () => {
  const theme = useTheme();
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [previewFile, setPreviewFile] = useState<
    (File & { preview: string }) | undefined
  >(undefined);
  const { setFieldValue } = useFormikContext();
  useEffect(() => {
    setFieldValue("addressProof", uploadedFile);
  }, [uploadedFile]);
  const dropzoneStyle = {
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: "20px",
    borderColor: theme.palette.secondary.main,
    borderStyle: "solid",
    color: theme.palette.secondary.main,
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const preview = useMemo(() => {
    if (previewFile) {
      return (
        // @ts-ignore
        <div style={thumb} key={previewFile.name}>
          <div style={thumbInner}>
            <img src={previewFile.preview} style={img} alt={previewFile.name} />
          </div>
          <div style={{ width: "100%" }}>
            <button
              style={deleteButton}
              onClick={() => {
                setPreviewFile(undefined);
                setUploadedFile(undefined);
              }}
            >
              X
            </button>
          </div>
        </div>
      );
    }
    return <></>;
  }, [previewFile]);
  return (
    <Grid item container xs={6} marginX="auto" marginTop={4}>
      <Grid item xs={12}>
        <Paper
          sx={{
            borderRadius: "20px",
            width: "100%",
          }}
          elevation={10}
        >
          <Dropzone
            onDrop={(acceptedFiles) => {
              setUploadedFile(acceptedFiles[0]);
              setPreviewFile(
                Object.assign(acceptedFiles[0], {
                  preview: URL.createObjectURL(acceptedFiles[0]),
                })
              );
            }}
            maxFiles={1}
            accept={{ "image/png": [".png"], "image/jpeg": [".jpeg"] }}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps({ style: dropzoneStyle })}>
                  <input
                    {...getInputProps()}
                    hidden
                    name="addressProof"
                    type="file"
                  />
                  {uploadedFile ? (
                    <p>{uploadedFile.name}</p>
                  ) : (
                    <>
                      {" "}
                      <p>
                        Incarcati o poza cu o dovada a adresei apartamentului pe
                        care il adaugati (factura, taxe locale etc.)
                      </p>
                      <em>
                        (Doar extensiile *.jpeg si *.png pentru imagini vor fi
                        acceptate)
                      </em>
                    </>
                  )}
                </div>
              </section>
            )}
          </Dropzone>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {preview}
      </Grid>
    </Grid>
  );
};

const AddressProofValidationSchema = Yup.object().shape({
  addressProof: Yup.mixed().required("Este necesara dovada adresei"),
});

const AddressProofStep = {
  component: AddressProofStepComponent,
  label: "Incarcare dovada adresa",
  validationSchema: AddressProofValidationSchema,
};

export default AddressProofStep;
