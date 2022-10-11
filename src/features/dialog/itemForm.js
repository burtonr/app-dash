import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
    Button,
    DialogContent,
    DialogActions,
    LinearProgress,
    TextField,
} from '@mui/material';

const styles = {
    spacedInput: {
        padding: '10px'
    },
    selectInput: {
        margin: 10,
    }
}

export const ItemForm = ({ initialValues, onFormSubmit, onClose, isLoading }) => {
    // TODO: Update validation schema... This is just the example from Formik tutorial
    const validationSchema = Yup.object({
        title: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        description: Yup.string()
            .max(20, 'Must be 20 characters or less'),
        url: Yup.string().url('Must be a valid full URL').required('Required'),
        imageUrl: Yup.string().url('Must be a valid full URL'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onFormSubmit(values)
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <DialogContent>
                    <TextField
                        fullWidth
                        id="item-title"
                        label="Title"
                        name="title"
                        style={styles.spacedInput}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />

                    <TextField
                        fullWidth
                        id="item-description"
                        label="Description"
                        name="description"
                        style={styles.spacedInput}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />

                    <TextField
                        fullWidth
                        id="item-url"
                        label="URL"
                        name="url"
                        style={styles.spacedInput}
                        onChange={formik.handleChange}
                        value={formik.values.url}
                        error={formik.touched.url && Boolean(formik.errors.url)}
                        helperText={formik.touched.url && formik.errors.url}
                    />

                    <TextField
                        fullWidth
                        id="item-imageurl"
                        label="Image URL"
                        name="imageUrl"
                        style={styles.spacedInput}
                        onChange={formik.handleChange}
                        value={formik.values.imageUrl}
                        error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
                        helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                    />
                    {isLoading && <LinearProgress />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={isLoading}>Submit</Button>
                </DialogActions>
            </form>
        </>
    )
}
