function getDifficulty(r){

    if(r<800){

        return{
            label:"🌱 Beginner",
            bar:"██░░░░░░░░"
        };

    }

    if(r<1000){

        return{
            label:"🟢 Very Easy",
            bar:"███░░░░░░░"
        };

    }

    if(r<1200){

        return{
            label:"🔵 Easy",
            bar:"████░░░░░░"
        };

    }

    if(r<1500){

        return{
            label:"🟡 Medium",
            bar:"██████░░░░"
        };

    }

    if(r<1800){

        return{
            label:"🟠 Hard",
            bar:"████████░░"
        };

    }

    if(r<2100){

        return{
            label:"🔴 Very Hard",
            bar:"█████████░"
        };

    }

    return{
        label:"⚫ Expert+",
        bar:"██████████"
    };

}

module.exports=getDifficulty;