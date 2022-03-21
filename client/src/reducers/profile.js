import { CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, GET_PROFILES, FOLLOW_UNFOLLOW_USER, GET_FOLLOWINGS } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    followings:[],
    error: {}
  };

  export default function(state=initialState, action){
      const {type,payload} = action

      switch(type){
          case GET_PROFILE:
          case UPDATE_PROFILE:
              return {
                  ...state,
                  profile: payload,
                  loading: false
              }    
          case GET_PROFILES:
              return {
                  ...state,
                  profiles: payload,
                  loading: false
              }
          case GET_FOLLOWINGS:
              return {
                  ...state,
                  followings: payload
              }
          
          case PROFILE_ERROR:
              return {
                  ...state,
                  error: payload,
                  loading: false,
                  profile:null
              }
          case FOLLOW_UNFOLLOW_USER:
              return {
                  ...state,
                  followings: payload
              }
         case CLEAR_PROFILE:
             return {
                 ...state,
                 profile:null,
                 followings:[],
                 repos: [],
                 loading:true //true?????????
             }
          default:
              return state
      }

  }