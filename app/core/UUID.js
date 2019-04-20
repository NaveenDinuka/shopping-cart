import uuidv1 from 'uuid/v1';

class UUID {
    static timeStampUUID() {
        return uuidv1();
    }

    /**
     * Generate Customer ID
     * @return String 'customer_qa'
     * */
    static CUSTOMER_ID(prefix) {
    	return `customer_${prefix}`;
    }

    /**
     * Generate Agnt ID
     * @return String 'agent_10'
     * */
    static AGENT_ID(prefix, id) {
    	return `${prefix}_agent_${id}`;
    }

    /**
     * Generate User ID
     * @return String 'user_5'
     * */
    static USER_ID(prefix, id) {
    	return `${prefix}_user_${id}`;
    }
    
}

export default UUID;
