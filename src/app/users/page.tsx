"use client";

import {Suspense} from "react";
import UsersPageContent from "@/components/users-page-content/UsersPageContent";

export default function UsersPage() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UsersPageContent />
        </Suspense>
    );
}