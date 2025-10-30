import {ConnectedProps} from "react-redux";
import {connector} from "../components/Login/Login";
import {FieldErrors, UseFormRegister, UseFormSetError, UseFormSetValue} from "react-hook-form";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import {authActions} from "../redux/auth-reducer";
import {messagesActions} from "../redux/messages-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";

export enum ActionTypes {
    INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS",
    SET_USER_DATA = "dilute-network/auth/SET_USER_DATA",
    GET_CAPTCHA_URL_SUCCESS = "dilute-network/auth/GET_CAPTCHA_URL_SUCCESS",
    SEND_MESSAGE = "SEND-MESSAGE",
    ADD_POST = "ADD-POST",
    UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT",
    SET_USER_PROFILE = "SET_USER_PROFILE",
    SET_STATUS = "SET_STATUS",
    DELETE_POST = "DELETE_POST",
    SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS",
    SAVE_PROFILE_INFO_SUCCESS = "SAVE_PROFILE_INFO_SUCCESS",
    FOLLOW = "FOLLOW",
    UNFOLLOW = "UNFOLLOW",
    SET_USERS = "SET_USERS",
    SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
    SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT",
    TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING",
    TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE_FOLLOWING_IN_PROGRESS",
}

export interface IAppInitialState {
    initialized: boolean
}

export interface IInitializedSuccessAction {
    type: ActionTypes.INITIALIZED_SUCCESS
}

export interface IAuthInitialState {
    userId: number | null
    email: string | null
    login: string | null
    isAuthorized: boolean
    captchaUrl: string | null
}

interface IPayloadSetAuth {
    userId: number | null
    email: string | null
    login: string | null
    rememberMe?: boolean
    isAuthorized?: boolean
    captchaUrl?: string | null
}

export interface ISetAuthUserDataAction {
    type: ActionTypes.SET_USER_DATA
    payload: IPayloadSetAuth
}

export interface IGetCaptchaUrlSuccess {
    type: ActionTypes.GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string }
}

export interface IDialogs {
    id: number
    name: string
    ava: string
}

export interface IMessages {
    id: number
    message: string
}

export interface IMessagesInitialState {
    d: IDialogs[]
    m: IMessages[]
}

export interface ISendMessageCreator {
    type: ActionTypes.SEND_MESSAGE,
    body: string
}

export interface IPosts {
    id: number
    message: string
    likesCount: number
}

export interface IContacts {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export interface IPhotos {
    small: string | null
    large: string | null
}

export interface IProfile {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: IContacts
    photos: IPhotos
    aboutMe?: any
}

export interface IProfileReducerInitialState {
    posts: IPosts[]
    profile: IProfile
    status: string
    newPostText?: string
}

export interface IAddPostActionCreator {
    type: ActionTypes.ADD_POST,
    payload: string
}

export interface ISetUserProfile {
    type: ActionTypes.SET_USER_PROFILE,
    profile: IProfile
}

export interface ISetStatus {
    type: ActionTypes.SET_STATUS,
    status: string
}

export interface IDeletePost {
    type: ActionTypes.DELETE_POST,
    postId: number
}

export interface ISavePhotoSuccess {
    type: ActionTypes.SAVE_PHOTO_SUCCESS,
    photos: IPhotos
}

export interface ISaveProfileSuccess {
    type: ActionTypes.SAVE_PROFILE_INFO_SUCCESS,
    profileInfo: IProfile
}

export interface IUpdateNewPostTextAction {
    type: ActionTypes.UPDATE_NEW_POST_TEXT
    text: string
}

export interface IUser {
    id: number
    name: string
    status: string
    photos: IPhotos
    followed: boolean
}

export interface IUsersReducerInitialState {
    users: IUser[]
    pageSize: number
    totalUsersCount: number | null
    currentPage: number
    isFetching: boolean
    followingInProgress: number[]
}

export interface IFollowSuccess {
    type: ActionTypes.FOLLOW,
    userId: number
}

export interface IUnfollowSuccess {
    type: ActionTypes.UNFOLLOW,
    userId: number
}

export interface ISetUsers {
    type: ActionTypes.SET_USERS,
    users: IUser[]
}

export interface ISetCurrentPage {
    type: ActionTypes.SET_CURRENT_PAGE,
    currentPage: number
}

export interface ISetTotalUsersCount {
    type: ActionTypes.SET_TOTAL_USERS_COUNT,
    count: number
}

export interface IToggleIsFetching {
    type: ActionTypes.TOGGLE_IS_FETCHING,
    isFetching: boolean
}

export interface IToggleFollowingProgress {
    type: ActionTypes.TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching: boolean
    userId: number
}

export interface ISideBarInitialState {

}

export interface IPaginatorProps {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChange: (page: number) => void
}

export interface IUsersProps extends IPaginatorProps {
    users: IUser[]
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    followingInProgress: number[]

}

export interface IUsersContainerProps extends IUsersProps {
    isFetching: boolean
    pageTitle: string

    requestUsers: (currentPage: number, pageSize: number) => void
}

export interface IRootReducer {

}

export interface IUsersContainerMapStateToProps extends Pick<IUsersContainerProps,
    'users' |
    'pageSize' |
    'totalUsersCount' |
    'currentPage' |
    'isFetching' |
    'followingInProgress'
> {

}

export interface IUsersContainerMapDispatchToProps extends Pick<IUsersContainerProps,
    'follow' |
    'unfollow' |
    'requestUsers'
> {

}

export interface IUsersContainerOwnProps  {
    pageTitle: string
}

export interface IProfileStatusProps {
    status: string
    updateStatus: (newStatus: string) => void
}
export interface IProfileStatusState {
    editMode: boolean
    status: string
}

export type ProfileActions =
    | IAddPostActionCreator
    | IUpdateNewPostTextAction
    | ISetUserProfile
    | ISetStatus
    | IDeletePost
    | ISavePhotoSuccess
    | ISaveProfileSuccess


export type UsersActions =
    | IFollowSuccess
    | IUnfollowSuccess
    | ISetUsers
    | ISetCurrentPage
    | ISetTotalUsersCount
    | IToggleIsFetching
    | IToggleFollowingProgress

export type AuthActions =
    | ISetAuthUserDataAction
    | IGetCaptchaUrlSuccess

export type IActions = ProfileActions | UsersActions | AuthActions

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10,
}

export interface IDataMe {
    id: number
    email: string
    login: string
    rememberMe?: boolean
    captchaUrl?: string
}

export interface IMeResponse {
    data: IDataMe
    resultCode: ResultCodesEnum
    messages: string[]
}

export interface ILogin {
     userId: number
    resultCode?: ResultCodesEnum | ResultCodeForCaptcha
    messages: string[]
}

export type IMapStateProps = {
    captchaUrl: string | null
    isAuthorized: boolean
}

export interface ILoginFormProps {
    login: (email: string, password: string, rememberMe: boolean, captcha: string, setError?: any, setValue?: any) => Promise<void>
    captchaUrl: string | null
}

export interface ILoginProps extends ILoginFormProps {
    isAuthorized: boolean
}

export type PropsFromRedux = ConnectedProps<typeof connector>

export type LoginComponentProps = ILoginProps & PropsFromRedux

export interface IFormControlProps {
    Component: React.ElementType | string
    name: string
    register: UseFormRegister<any>
    errors: FieldErrors
    touchedFields?: any
    validate?: (value: string) => string | boolean | undefined
    [key: string]: any
}

export interface IMyPostsStockProps {
    onAddPost: (message: string) => void
}

export interface IAddMessageStockProps {
    sendMessage: (message: string) => void
}

export interface ILoginStockProps {
    login: (email: string, password: string, rememberMe: boolean, captcha: string,
            setError?: UseFormSetError<any>, setValue?: UseFormSetValue<any>) => Promise<void>
    captchaUrl: string | null
}

export interface ILoginFormData {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string | null
    server?: string
}

export interface IResponse<T = {}, RC = ResultCodesEnum> {
    data: T
    messages: string[]
    resultCode: RC
}

export interface IGetItems {
    items: IUser[]
    totalCount: number
    error: string | null
}

export interface ISavePhoto {
    photos: IPhotos
}

export interface ICaptchaUrl {
    url: string
}
//reducers types control
type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, IAppInitialState, unknown, A>

export type AuthActionsType = InferActionsTypes<typeof authActions>
export type AuthThunkType = BaseThunkType<AuthActionsType>

export type MessagesActionsType = InferActionsTypes<typeof messagesActions>

export interface IDialogsOwnProps {
    messagesPage: IMessagesInitialState
    isAuthorized: boolean
    sendMessage: (messageText: string) => void
}

export interface IAppProps {
    initializeApp: () => void
    initialized: boolean
}

export interface IUserComponent {
    user: IUser
    followingInProgress: number[]
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

export interface IMyPostsProps {
    posts: IPosts[]
    updateNewPostText: (newPostText: string) => void
    addPost: (message: string) => void
}

export interface IMyPostsContainerProps {
    posts: IPosts[]
    newPostText: string
    users: IUser[]
}

export interface IMyPostsContainerDispatch {
    updateNewPostText: (text: string) => void
    addPost: (text: string) => void
}

export interface IPostProps {
    image: string
    message: string
    likes: number
}

export interface IProfileFormData {
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: IContacts
}

export interface IProfileDataFormProps {
    profile: IProfile
    onSubmit: (data: IProfileFormData, setError?: (error: string) => void) => void
    setEditMode: (editMode: boolean) => void
    errorMessage: string
    setExpanded: (expanded: boolean) => void
}

export interface IContactProps {
    contactTitle: string
    contactValue: string
}

export interface IProfileDataProps {
    profile: IProfile
    isOwner: boolean
    activateEditMode: (e: React.MouseEvent) => void
    expanded: boolean
    setExpanded: (expanded: boolean) => void
}

export interface IProfileInfoProps {
    profile: IProfile
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: Blob) => void
    saveProfile: (profileInfo: IProfile) => Promise<ISaveProfileResult>
}

export interface IProfileStatusWithHooksProps {
    status: string
    updateStatus: (status: string) => void
}

export interface IProfilePageProps {
    profile: IProfile | null
    isOwner: boolean
    status: string
    updateStatus: (status: string) => void
    savePhoto: (file: Blob) => void
    saveProfile: (profileInfo: IProfile) => Promise<{success?: boolean; error?: string}>
}

export interface IWithRouterProps {
    navigate: ReturnType<typeof useNavigate>
    params: {userId?: number}
    location: ReturnType<typeof useLocation>
}

export interface IProfilePageContainerMapStateProps {
    profile: IProfile | null
    status: string
    authorizedUserId: number | null
    isAuthorized: boolean
}

export interface IHeaderProps {
    login: string
    isAuthorized: boolean
    logout?: () => void
}

export interface IDialogItem {
    ava: string
    name: string
    id: number
}

export interface IMessages {
    message: string
    id: number
}

export interface ISaveProfileResult {
    success?: boolean;
    error?: string;
}

