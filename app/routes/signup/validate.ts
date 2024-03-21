export const validate = (
    email: string,
    password: string,
    passwordCheck: string
) => {
    const errors: {
        email?: string;
        password?: string;
        passwordCheck?: string;
    } = {};
    if (!email) {
        errors.email = "メールアドレスを入力してください";
    }
    if (!password) {
        errors.password = "パスワードを入力してください";
    }

    if (!passwordCheck) {
        errors.passwordCheck = "パスワード（確認用）を入力してください";
    }

    if (password !== passwordCheck) {
        errors.password = "パスワードが一致しません";
    }

    return Object.keys(errors).length > 0 ? errors : null;
};
