import Compressor from 'compressorjs';
import {Storage} from "aws-amplify";

export const compress = async (file, width, height) => {
    return new Promise((resolve, reject) => {
        new Compressor(file, {
            resize: "cover",
            width: width,
            height: height,
            convertTypes:"image/webp",
            mimeType:"image/webp",

            success: resolve,
            error: reject
        });
    });
}

export const uploadImage = async (file, path, width, height) => {
    if(file === null || file === undefined || path === null || path === undefined) return null;

    width = width === undefined ? 300 : width;
    height = height === undefined ? 300 : height;

    file = await compress(file, width, height);

    await Storage.put(
        path,
        file, {
        level: 'public',
    });
}

export const deleteImage = async (path) => {
    if(path === null || path === undefined) return null;

    await Storage.remove(path, {
        level: 'public'
    });
}

export async function getImage(path) {

    if(path === null || path === undefined) return null;

    return await Storage.get(path, {
        level: 'public'
    });
}