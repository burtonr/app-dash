import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
    Autocomplete,
    Button,
    DialogContent,
    DialogActions,
    LinearProgress,
    TextField,
} from '@mui/material';
import { usePrefetch } from "../api/apiSlice";
import { useSelector } from 'react-redux';

const styles = {
    spacedInput: {
        padding: '10px'
    },
    selectInput: {
        margin: 10,
    }
}

export const ItemForm = ({ initialValues, onFormSubmit, onClose, isLoading }) => {
    const prefetchItems = usePrefetch('getItems')
    useEffect(() => {
        prefetchItems()
    }, [])
    const items = useSelector(state => state.items)

    const validationSchema = Yup.object({
        title: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        description: Yup.string()
            .max(30, 'Must be 30 characters or less'),
        url: Yup.string().url('Must be a valid full URL').required('Required'),
        imageUrl: Yup.string().url('Must be a valid full URL'),
        group: Yup.string().max(15, 'Must be 15 characters or less').nullable(),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            onFormSubmit(values)
        }
    })

    const findExistingGroups = () => {
        var allGroups = []
        for(var item of items) {
            if (item.group)
                allGroups.push(item.group)
        }

        return allGroups
    }

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

                    <Autocomplete
                        fullWidth
                        freeSolo
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        options={findExistingGroups()}
                        renderInput={(params) => 
                            <TextField
                                {...params}
                                id="item-group"
                                name="group"
                                label="Group"
                                style={styles.spacedInput}
                                onChange={formik.handleChange}
                                value={formik.values.group}
                                error={formik.touched.group && Boolean(formik.errors.group)}
                                helperText={formik.touched.group && formik.errors.group}
                            />
                        }
                        onChange={(_, value) => {
                            console.log(`Change value: ${value}`)
                            formik.setFieldValue("group", value, true)
                        }}
                        onBlur={formik.handleBlur}
                        value={formik.values.group}
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
