export interface ApplyJobInterface {
    isAuthUser: boolean,
    fullname: string,
    email: string,
    phone: string
    resume: string | Blob,
    resume_name: string,
    portfolio_url: string,
    cover_letter: string,
    answers: any[]
}

