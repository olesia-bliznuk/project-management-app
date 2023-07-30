export interface user {
    "_id": string,
    "name": string,
    "login": string
};

export interface board {
    "_id": string,
    "title": string,
    "owner": string,
    "users": [
        string
    ]
};

export interface task {
    "_id": string,
    "title": string,
    "order": string,
    "boardId": string,
    "columnId": string,
    "description": string,
    "userId": string,
    "users": [
        string
    ]
};

export interface column {
    "_id": string,
    "title": string,
    "order": string,
    "boardId": string
}