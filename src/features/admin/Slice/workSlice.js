import workApi from "../../../api/workApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const workData = createAsyncThunk('works/workData', async (page) => {
    const work = await workApi.getAll(page);
    const dataWorks =  work && work.data.rows.filter((item) => {
        return item.status === 1;
    })
    // console.log("dataWorks", work.data.data.rows);
    // return work && work.data.data.rows.filter((item) => {
    //     return item.status === 1;
    // });
    return {
        data: {
            rows:dataWorks
        }
    };
})

export const workDataCheck = createAsyncThunk('works/workDataCheck', async (page) => {
    const workCheck = await workApi.getAll(page);
    const dataWorksCheck =  workCheck && workCheck.data.rows.filter((item) => {
        return item.status === 0;
    })
    // console.log("dataWorks", work.data.data.rows);
    // return work && work.data.data.rows.filter((item) => {
    //     return item.status === 1;
    // });
    return {
        data: {
            rows:dataWorksCheck
        }
    };
})
const Work = createSlice({
    name: "works",
    initialState: {
        work: [],
        workCheck: [],
        loading: true,
        error: ''
    },
    reducers: {
        addwork: (state, action) => {
            workApi.postwork(action.payload);
        },
        removework: (state, action) => {
            workApi.deletework(action.payload);
        },
        updatework: (state, action) => {
            workApi.editwork(action.payload);
        }
    },
    extraReducers: {
        [workData.pending]: (state) => {
            state.loading = true;
        },
        [workData.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [workData.fulfilled]: (state, action) => {
            state.loading = false;
            state.work = action.payload;
        },
        [workDataCheck.pending]: (state) => {
            state.loading = true;
        },
        [workDataCheck.rejected]: (state, action) => {
            state.loading = true;
            state.error = action.error;
        },
        [workDataCheck.fulfilled]: (state, action) => {
            state.loading = false;
            state.workCheck = action.payload;
        }
    }
});
const { reducer, actions } = Work;
export const { addwork, removework, updatework } = actions;

export default reducer;
