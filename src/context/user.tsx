import React, { useState, createContext, ReactElement } from "react";

type userData = {
    name: string;
    id: string;
    email: string;
    created_at: Date;
    updated_at: Date;
};

export const UserContext = createContext({});
