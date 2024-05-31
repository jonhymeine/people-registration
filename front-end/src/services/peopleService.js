const apiUrl = import.meta.env.VITE_API_URL;

const createPerson = async personData => {
    try {
        const response = await fetch(`${apiUrl}/person`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personData),
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const getPeople = async (setDataSource, setMaxKey) => {
    try {
        const response = await fetch(`${apiUrl}/people`);
        const data = await response.json();
        const dataWithKeys = data.map((data, index) => ({
            ...data,
            key: index,
        }));
        setDataSource(dataWithKeys);
        setMaxKey(dataWithKeys.length);
    } catch (error) {
        console.error(error);
    }
};

const updatePerson = async personData => {
    try {
        const response = await fetch(`${apiUrl}/person`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(personData),
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const getPeopleByFilter = async (searchMethod, searchValue, setDataSource) => {
    try {
        const response = await fetch(`${apiUrl}/person/${searchMethod}/${searchValue}`);
        const data = await response.json();
        const dataWithKeys = data.map((data, index) => ({
            ...data,
            key: index,
        }));
        setDataSource(dataWithKeys);
    } catch (error) {
        console.error(error);
    }
};

const deletePerson = async id => {
    try {
        const response = await fetch(`${apiUrl}/person`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

export {createPerson, getPeople, updatePerson, getPeopleByFilter, deletePerson};
