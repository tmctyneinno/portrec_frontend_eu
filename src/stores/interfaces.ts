export interface ApplyJobInterface {
    isAuthUser: boolean,
    fullname: string,
    email: string,
    phone: string
    resume: Blob | null,
    resume_name: string,
    portfolio_url: string,
    cover_letter: string,
    answers: any[]
}

