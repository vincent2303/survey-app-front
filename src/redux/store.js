import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './index.js';
import moment from 'moment';

const initialState = {
    auth: {
        pseudo: '',
        password: '',
        isConnected: false,
        booleanShowPassword: false,
        onPage: 2
    },
    userAuth: {
        pseudo: '',
        password: '',
        isConnected: false,
        showPassword: false
    },
    userMain: {
        toggleDrawer: false,
        selectedPage: 0,
        redirectToLogin: false,
        connectedUser: null,
    },
    generalStat: {
        totalSent: 0,
        totalAnswered: 0,
        totalRate: 0,
        totalWeek: 0,
        monthSent: [],
        monthAnswered: [],
        todayRate: 0,
        todaySatis: 0,
        monthSatis: [],
        weekRate: [],
        loaded: false,
        data: [],
    },
    specificSurvey: {
        startDate: moment(),
        loaded: false,
        comments: [],
        thematiqueList: [],
        loaded2: false,
    },
    manageSurvey: {
        sondageList: [],
        currentSondage: null,
        loaded: false,
        selectedSondage: {},
    },
    userSurvey: {
        loaded: false,
        alreadyAnswered: false,
        sondageName: "",
        thematiqueList: [],
        answers: null,
        comments: null,
        error: false,
        errorMessage: "Pas d'erreur",
        token: null,
        firstName: null,
        lastName: null,
        remplissage_id: null,
        sondage_id: null,
        user_id: null,
        mailIntensity: null,
        mailIntensityLoaded: false,
        mailIntensityError: null,
    },
    manageUser: {
        userList: null,
        csvServerRespons: null,
        singleServerRespons: null
    }
};

const middeleware = [thunk]

const store = createStore(
    rootReducer, 
    initialState,
    compose(
        applyMiddleware(...middeleware),
        window.devToolsExtension  && window.devToolsExtension()
    )
);

export { store, initialState };