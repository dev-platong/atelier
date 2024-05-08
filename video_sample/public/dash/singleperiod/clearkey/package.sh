rm -rf output
mp4fragment ../../../mp4/big_buck_bunny_720p_surround.mp4 fragmented.mp4
mp4dash --encryption-key=a7e61c373e219033c21091fa607bf3b7:76a6c65c5ea762046bd749a2e632ccbb fragmented.mp4