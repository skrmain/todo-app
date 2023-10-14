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

interface Metadata {
    pageNumber: 1;
    pageSize: 10;
    sortOrder: 'desc';
    sortBy: 'updatedAt';
    total: 1;
}

export interface ApiResponse<T> {
    data?: T;
    message: string;
    status: boolean;
    metadata: Metadata;
}

export interface SearchUser {
    _id: string;
    username: string;
}

export interface UserProfile {
    _id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}
