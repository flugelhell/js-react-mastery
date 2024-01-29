import { call, put, takeEvery } from "redux-saga/effects";
import { doAuth, authSuccess, authFailed, clearMessage } from "../reducers/authSlice";
import { BASE_URL } from "../apiEndpointConfig.js";
import axios from "axios";

function* doLogin(action) {
    // payload = {email, password}
    const { payload } = action;
    // function untuk membuat delay
    const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));
    try {
        const res = yield axios.post(`${BASE_URL}/user/signin`, payload);
        console.log(res);
        sessionStorage.setItem("isAuth", true);
        sessionStorage.setItem("token", res.data.token);
        yield put(authSuccess());
        // delay 3 second
        yield delay(3000);
        yield put(clearMessage());
    } catch (err) {
        //here
        console.log(err);
        yield put(authFailed({ error: { code: err?.code, message: err?.message }, message: err?.response?.data?.message }));
        // delay 3 second
        yield delay(3000);
        yield put(clearMessage());
    }
}
export function* watchAuth() {
    // function ini akan dijalankan ketika doAuth di call oleh component
    // dan pararel menjalankan doLogin
    yield takeEvery(doAuth, doLogin);
}
