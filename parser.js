exports.parseTheUrl = function(url)
{
    var slashIndexes = [];
    var slashDatas = [];
    var tempIndex = 0;
    var lengthOfSlashIndexes;
    var i;
    while(url.indexOf('/',tempIndex) != -1) //while we did not reached end of the url
    {
        tempIndex = url.indexOf('/',tempIndex);
        lengthOfSlashIndexes = slashIndexes.push(tempIndex);
        tempIndex += 1;
    }
    for(i=0;i<lengthOfSlashIndexes-1;i++)
    {
        slashDatas.push(url.substr(slashIndexes[i]+1,slashIndexes[i+1]-slashIndexes[i]-1));
        //console.log(slashDatas[i]);
    }
    
    if(slashDatas[0] != "names"){
        console.log(slashDatas[0]);
        return -1;
    }
    if(slashDatas.length>2 && slashDatas[2] != "emails"){
        console.log(slashDatas[1]);
        return -1;
    }
    if(slashDatas.length>3 &&slashDatas[4] != "scores"){
        console.log(slashDatas[2]);
        return -1;
    }
    if(slashDatas.length==2){
        return [2,slashDatas[1]];
    }
    if(slashDatas.length==4){
        return [4,slashDatas[1],slashDatas[3]];
    }
    if(slashDatas.length==6){
        return [6,slashDatas[1],slashDatas[3],slashDatas[5]];
    }
    return [slashDatas.length];
    
}