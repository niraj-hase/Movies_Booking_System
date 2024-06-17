module.exports.home = async function(req,res){
    try{
        
        console.log('home component called......');
        return res.status(201).json({
            success: true,
            message: 'Demo runs successfully successfully created'
        });
    }
    catch(err){
        console.log("Error in loading the home page ",err);
        return;
    }
}