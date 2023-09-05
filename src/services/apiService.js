
// Simulate the process of creating a user. Returns a success status .
export const createUser = (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5; // 50% chance of success in creating user
            isSuccess ? resolve({ success: true }) : reject({ success: false });
        }, 1000); 
    });
}
// Simulate the process of verifying if an email already exists.
export const verifyEmail = (email) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const exists = Math.random() > 0.5; // 50% chance email exists
            resolve({ exists });
        }, 1000); 
    });
};
// Simulate the process of uploading a JSON file.
export const uploadJSON = (email, file) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5; 
            isSuccess ? resolve({ success: true }) : reject({ success: false });
        }, 1000); 
    });
}
// Simulate the process of uploading microscope images.
export const uploadMicroscopeImages = (email, images) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5;
            isSuccess ? resolve({ success: true }) : reject({ success: false });
        }, 1000);
    });
}
// Simulate the process of uploading hair charts.
export const uploadHairCharts = (email, charts) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const isSuccess = Math.random() > 0.5;
            isSuccess ? resolve({ success: true }) : reject({ success: false });
        }, 1000);
    });
}

