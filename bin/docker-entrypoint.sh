if [ "$NODE_ENV" == "development" -a "$NODE_WATCH" == "Y" ]; then
    npm run dev-watch;
elif [ "$NODE_ENV" == "development" -a \( "$NODE_WATCH"=="" -o "$NODE_WATCH"=="N" \) ]; then
    npm run dev;
elif [ "$NODE_ENV" == "testing" ]; then
    npm run test;
elif [ "$NODE_ENV" == "production" ]; then
    npm run prod;
else
    echo "Not Found ENV";
fi