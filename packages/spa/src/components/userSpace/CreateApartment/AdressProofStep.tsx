import React, { useEffect, useState } from "react";
import { Grid, Paper, useTheme } from "@mui/material";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useFormikContext } from "formik";

const AddressProofStepComponent: React.FC = () => {
  const theme = useTheme();
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
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
            onDrop={(acceptedFiles) => setUploadedFile(acceptedFiles[0])}
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
