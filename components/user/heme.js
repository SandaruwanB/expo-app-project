<View style={styles.content}>
<View style={[styles.iconContentList, { paddingHorizontal : 20, paddingBottom : 15, paddingTop : 10,}]}>
    <View style={{flexDirection : 'row', position : 'relative',}}>
        <TouchableOpacity style={{flexDirection : 'row'}}>
            <Image source={require('../../assets/images/defaultUser.png')} style={styles.userImage}/>
            <View style={{marginLeft : 10,}}>
                <Text style={{fontSize : 15, fontWeight : 'bold', color : '#222B45',}}>Sandaruwan Bandara</Text>
                <Text style={{fontSize : 12, color : '#8F9BB3',}}>Software Engineer</Text>
            </View>
        </TouchableOpacity>
    </View>
    <View style={{flexDirection : 'row', position : 'relative',}}>
        <TouchableOpacity style={{flexDirection : 'row',}} onPress={()=>setBottomTabOpen(true)}>
            <MatIcons name='dots-vertical' style={styles.bottomSheetOpenIcon}/>
        </TouchableOpacity>
    </View>
</View>
{
    image !== "" ?
    <View style={{width : '100%', height : '20%', paddingHorizontal : 5, position : 'relative'}}>
        <Image source={{uri : `data:image/png;base64,${image}`}} style={{width : '100%', height : '90%',}}/>
    </View>  : ""
}
<View style={{padding : 20, backgroundColor : '#F2F8FF',}}>
    <Text style={{fontSize : 18, textAlign : 'justify',}}>test test test test test test test test test test test test test test test test test test test test test test ?</Text>
</View>
<View style={[styles.iconContentList, {paddingHorizontal : 25, paddingBottom : 4, marginTop : 15,}]}>
    <View style={{flexDirection : 'row'}}>
        <IonIcons name='star' style={[styles.starIcon, { color : '#FFC94D',}]}/>
        <Text style={{paddingLeft : 4, color : '#2E3A59', fontSize : 13,}}>112 persons starred this</Text>
    </View>
    <View>
        <TouchableOpacity>
            <Text style={{color : '#2E3A59', fontSize : 13,}}>36 comments</Text>
        </TouchableOpacity>
    </View>
</View>
<View style={styles.topLine}></View>
<View style={styles.iconContent}>
    <View style={styles.iconContentList}>
        <View></View>
        <View>
            <IonIcons name='star' style={[styles.starIcon, { color : '#FFC94D', display : 'none',}]}/>
            <IonIcons name='star-outline'  style={[styles.starIcon, {textAlign : 'center', }]}/>
            <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 12, display : 'none',}}>Starred</Text>
            <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 12,}}>Star</Text>
        </View>
        <View>
            <FaFa name='comment-dots' style={[styles.starIcon, {textAlign : 'center'}]}/>
            <Text style={{textAlign : 'center', color : '#2E3A59', fontSize : 12,}}>Comment</Text>
        </View>
        <View></View>
    </View>
</View>
</View>  