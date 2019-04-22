import uuidv1 from 'uuid/v1';

class UUID {
    static timeStampUUID() {
        return uuidv1();
    }
}

export default UUID;
