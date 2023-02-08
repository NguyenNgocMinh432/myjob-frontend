import formCVApi from "../../../api/formCVApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const formCVData = createAsyncThunk('formCVs/formCVData', async (page) => {
    const formCV = await formCVApi.getAll(page);
    return formCV;
})
const FormCv = createSlice({
    name: "formCVs",
    initialState: {
        formCV: [],
        loading: true,
        error: ''
    },
    reducers: {
        addformCV: (state, action) => {
            formCVApi.postformCV(action.payload);
        },
        removeformCV: (state, action) => {
            formCVApi.deleteformCV(action.payload);
        },
        updateformCV: (state, action) => {
            formCVApi.editformCV(action.payload);
        }
    },
    extraReducers: {
        [formCVData.pending]: (state) => {
            state.loading = true;
        },
        [formCVData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [formCVData.fulfilled]: (state, action) => {
            state.loading = false;
            state.formCV = action.payload;
        }
    }
});
const { reducer, actions } = FormCv;
export const { addformCV, removeformCV, updateformCV } = actions;

export default reducer;
