export const validate = (email: string, password: string) => {
    const errors: { email?: string; password?: string } = {};
    if (!email) {
        errors.email = "メールアドレスを入力してください";
    }
    if (!password) {
        errors.password = "パスワードを入力してください";
    }

    return Object.keys(errors).length > 0 ? errors : null;
};
