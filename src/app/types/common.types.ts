export enum TodoPermissions {
    read = 'read',
    write = 'write',
    delete = 'delete',
    share = 'share',
}

export enum TodoStatus {
    created = 'created',
    done = 'done',
    archive = 'archive',
}

export interface Todo {
    _id: string;
    title: string;
    detail?: string;
    status: TodoStatus;
    createdAt: string;
    updateAt: string;
    permissions: TodoPermissions[];
}

export interface ApiResponse<T> {
    data?: T;
    message: string;
    status: boolean;
    metadata: object;
}

export interface SearchUser {
    _id: string;
    username: string;
}
