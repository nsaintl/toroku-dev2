import {goToSignIn, query} from "../App";


export const LoadElements = async (content, refSideBar, filter, sort, search, searchName) => {

    const nextToken = refSideBar.getNextToken();
    if(nextToken === null) return;
    content = content === undefined ? refSideBar.getContent() : content;
    const data = await query(search, {
        filter: filter,
        nextToken: nextToken,
        limit: 25,
        sort: sort
    }, true);
    if(data[0] !== "SUCCESS") return;
    const newContent = [
        ...content,
        ...data[1]["data"][searchName]["items"]
    ];
    const newToken = data[1]["data"][searchName]["total"] === newContent.length ? null : data[1]["data"][searchName]["nextToken"];
    refSideBar.setNextToken(newToken);
    refSideBar.setContent(newContent);
}

export const RemoveElement = async (element, reset, remove) => {
    const id = element === null ? undefined : element.id;
    const _version = element === null ? undefined : element._version;
    const input = {
        _version: _version,
        id: id,
    }
    await query(remove, {input: input}, false);
    reset(null);
}

export const submitVerification = async (user, groupList, element, deployed, navigate, input, create, update, createName, updateName) => {

    if(groupList !== undefined) {

        let submitter = null;
        let validator = null;
        let isDeployed = null;
        if(groupList.includes("ADMIN") || groupList.includes("SUBMITTER_LEADER")) {
            isDeployed = deployed;
            submitter = element !== null && element.submitter !== null ? element.submitter : user["attributes"]["email"];
            if(isDeployed) {
                validator = user["attributes"]["email"];
            } else {
                validator = null;
            }
        } else if(groupList.includes("SUBMITTER")) {
            isDeployed = false;
            submitter = user["attributes"]["email"];
        } else {
            await goToSignIn(navigate);
        }

        const id = element === null ? undefined : element.id;
        const _version = element === null ? undefined : element._version;
        const newInput = {
            _version: _version,
            id: id,
            submitter: submitter,
            isDeployed: isDeployed,
            validator: validator,
            ...input
        }
        let result;
        let queryName;
        if(element === null) {
            result = await query(create, {input: newInput}, false);
            queryName = createName;
        } else {
            result = await query(update, {input: newInput}, false);
            queryName = updateName;
        }
        console.log(result)
        if(result[0] === "SUCCESS") {
            return result[1]["data"][queryName]["id"];
        } else if(result[0] === "ERROR") {
            return result[1]["data"][queryName]["id"];
        } else {
            return null;
        }

    } else {

        await goToSignIn(navigate);
    }
    return null;
}