export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.app.json",
                // tsconfig: {
                //   jsx: "react-jsx",
                //   esModuleInterop: true,
                // },
            },
        ],
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "^@/integrations/supabase/client$": "<rootDir>/__mocks__/supabaseClient.ts",
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
